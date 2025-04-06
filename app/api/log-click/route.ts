import { NextRequest, NextResponse } from 'next/server'
import { appendFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
    const { type } = await request.json()
    const timestamp = new Date().toISOString()

    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'

    const userAgent = request.headers.get('user-agent') || 'unknown'

    const line = `[${timestamp}] type=${type} | ip=${ip} | ua=${userAgent}\n`
    const filePath = join(process.cwd(), 'click-log.txt')

    await appendFile(filePath, line)

    return NextResponse.json({ status: 'logged' })
}
