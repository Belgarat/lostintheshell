import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function GET(req: NextRequest) {
    const landing = req.nextUrl.searchParams.get('landing') || 'lost-in-the-shell'

    const { data, error } = await supabase
        .from('clicks')
        .select('*')
        .eq('landing', landing)
        .order('timestamp', { ascending: false })
    if (data) {
        const views = data.filter(e => e.type === 'view').length
        const clicks = data.filter(e => e.type !== 'view').length

        if (error) return NextResponse.json({ error }, { status: 500 })

        const total = data.length
        const amazon = data.filter((e: { type: string }) => e.type === 'amazon').length
        const download = data.filter((e: { type: string }) => e.type === 'download').length

        const bounceRate = views > 0
            ? Math.round(((views - clicks) / views) * 100)
            : 0

        return NextResponse.json({
            total,
            amazon,
            download,
            bounceRate,
            last: data.slice(0, 10),
        })
    }
    return NextResponse.json({
        total: 0,
        amazon: 0,
        download: 0,
        bounceRate: 0,
        last: '',
    })
}
