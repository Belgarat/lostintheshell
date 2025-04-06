'use client'

import Image from 'next/image'

export default function Home() {
    const logClick = async (type: string) => {
        try {
            await fetch('/api/log-click', {
                method: 'POST',
                body: JSON.stringify({ type }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        } catch (err) {
            console.error('Logging error', err)
        }
    }

    const handleAmazonClick = () => {
        logClick('amazon')
        window.location.href = 'https://a.co/d/b76kusy'
    }

    const handleDownloadClick = () => {
        logClick('download')
        window.open('/extract.pdf', '_blank')
    }

    return (
        <section className="hero">
            <div className="cover-wrapper">
                <Image
                    src="/cover.webp"
                    alt="Book cover: Lost in the Shell"
                    width={300}
                    height={450}
                    className="book-cover"
                    priority
                />
            </div>

            <h1>Lost in the Shell</h1>
            <p>
                17 strange stories. One distorted reality. <br />
                A surreal sci-fi journey for <span style={{fontWeight: "bold", color: "#ff6a00"}}>thinkers.</span>.
            </p>

            <div className="buttons">
                <button className="btn flex items-center gap-2" onClick={handleAmazonClick}>
                    <img src="/amazon.svg" alt="Amazon logo" className="w-5 h-5" />
                    Buy on Amazon
                </button>
                <button className="btn secondary" onClick={handleDownloadClick}>
                    📄 Get a sneak peek
                </button>
            </div>

            <p className="reminder">
                💬 If you enjoyed the read, please leave a review on Amazon.<br />
                It helps independent voices stay alive.
            </p>
        </section>
    )
}
