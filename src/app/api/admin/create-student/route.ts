import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing environment variables:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!serviceRoleKey
      });
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Admin client dengan service_role key (bisa create users)
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

    // Step 1: Create user di auth.users
    console.log('Creating auth user...');
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name,
        role: 'student',
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: `Gagal membuat akun: ${authError.message}` },
        { status: 400 }
      );
    }

    console.log('Auth user created:', authUser.user.id);

    // Step 2: Wait a bit for trigger to create profile
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: Update profile dengan data lengkap
    console.log('Updating profile...');
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        nisn: nisn || null,
        phone: phone || null,
        address: address || null,
        parent_name: parent_name || null,
        role: 'student',
      })
      .eq('user_id', authUser.user.id)
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      // Rollback: delete auth user jika profile gagal
      console.log('Rolling back: deleting auth user...');
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      return NextResponse.json(
        { error: `Gagal membuat profile: ${profileError.message}` },
        { status: 500 }
      );
    }

    console.log('Profile updated successfully:', profile.id);

    return NextResponse.json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      data: {
        id: profile.id,
        email: authUser.user.email,
        full_name: profile.full_name,
      },
    });
  } catch (error: any) {
    console.error('Create student error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
