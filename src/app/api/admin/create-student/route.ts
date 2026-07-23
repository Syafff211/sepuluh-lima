import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!serviceRoleKey,
      keyLength: serviceRoleKey?.length || 0,
    });

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Admin client dengan service_role key
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email, password, full_name, nisn, phone, address, parent_name, class_position } = body;

    console.log('Creating student:', { email, full_name, hasPassword: !!password });

    // Validasi
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Email, password, dan nama lengkap wajib diisi' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Step 1: Check if user already exists
    console.log('Checking if user exists...');
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);
    
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: `Email ${email} sudah terdaftar. Gunakan email lain.` },
        { status: 400 }
      );
    }

    // Step 2: Create user dengan sign up (lebih reliable daripada admin.createUser)
    console.log('Creating user with sign up...');
    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role: 'student',
        },
        emailRedirectTo: undefined, // Don't send confirmation email
      },
    });

    if (signUpError) {
      console.error('Sign up error:', signUpError);
      return NextResponse.json(
        { error: `Gagal membuat akun: ${signUpError.message}` },
        { status: 400 }
      );
    }

    if (!signUpData.user) {
      console.error('No user returned from sign up');
      return NextResponse.json(
        { error: 'Gagal membuat akun: No user data returned' },
        { status: 500 }
      );
    }

    console.log('User created:', signUpData.user.id);

    // Step 3: Manually confirm email (karena kita pakai service role)
    console.log('Confirming email...');
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      signUpData.user.id,
      { email_confirm: true }
    );

    if (confirmError) {
      console.error('Confirm email error:', confirmError);
      // Continue anyway, user can still login
    }

    // Step 4: Wait a bit for trigger to create profile
    console.log('Waiting for profile creation...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 5: Update profile dengan data lengkap
    console.log('Updating profile...');
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        nisn: nisn || null,
        phone: phone || null,
        address: address || null,
        parent_name: parent_name || null,
        class_position: class_position || null,
        role: 'student',
      })
      .eq('user_id', signUpData.user.id)
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      // Don't rollback, user already created
      return NextResponse.json(
        { error: `Akun berhasil dibuat, tapi gagal update profile: ${profileError.message}` },
        { status: 500 }
      );
    }

    console.log('Profile updated successfully:', profile.id);

    return NextResponse.json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      data: {
        id: profile.id,
        email: signUpData.user.email,
        full_name: profile.full_name,
      },
    });
  } catch (error: any) {
    console.error('Create student error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
