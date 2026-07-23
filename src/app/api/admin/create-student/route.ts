import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Admin client dengan service_role key (bisa create users)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, nisn, phone, address, parent_name } = body;

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
        { error: authError.message },
        { status: 400 }
      );
    }

    // Step 2: Create profile (trigger akan auto-create, tapi kita update dengan data lengkap)
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
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      return NextResponse.json(
        { error: 'Gagal membuat profile: ' + profileError.message },
        { status: 500 }
      );
    }

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
