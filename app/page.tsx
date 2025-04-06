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
                    src="/cover.jpg"
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
                A surreal sci-fi journey for the curious mind.
            </p>

            <div className="buttons">
                <button className="btn" onClick={handleAmazonClick}>
                    🚀 Buy on Amazon
                </button>
                <button className="btn secondary" onClick={handleDownloadClick}>
                    📄 Download a Sample
                </button>
            </div>

            <p className="reminder">
                ✨ If you enjoyed the read, please leave a review on Amazon.<br />
                It helps independent voices stay alive.
            </p>
        </section>
    )
}
