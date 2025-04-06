import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: NextRequest) {
    const { type, landing } = await request.json()

    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { error } = await supabase.from('clicks').insert({
        type,
        landing,
        ip,
        user_agent: userAgent,
    })

    if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json({ status: 'error', error }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok' })
}
