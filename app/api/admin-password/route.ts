import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    return NextResponse.json({
      password: adminPassword,
      isDefault: adminPassword === 'admin123'
    })
  } catch (error) {
    console.error('Error getting admin password:', error)
    return NextResponse.json(
      { password: 'admin123', isDefault: true },
      { status: 500 }
    )
  }
}
