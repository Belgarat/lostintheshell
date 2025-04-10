'use client'

import Image from 'next/image'
import {track} from "@vercel/analytics";
import {useEffect, useState} from "react";

export default function Home() {
    useEffect(() => {
        fetch('/api/log-click', {
            method: 'POST',
            body: JSON.stringify({ type: 'view', landing: 'lost-in-the-shell' }),
            headers: { 'Content-Type': 'application/json' },
        })

        // Tracciamento scroll beyond hero
        const onScroll = () => {
            const hero = document.querySelector('.hero')
            if (!hero) return

            const heroBottom = hero.getBoundingClientRect().bottom
            if (heroBottom <= window.innerHeight * 0.5) {
                track('scrolldown')
                fetch('/api/log-click', {
                    method: 'POST',
                    body: JSON.stringify({ type: 'scrolldown', landing: 'lost-in-the-shell' }),
                    headers: { 'Content-Type': 'application/json' },
                })
                window.removeEventListener('scroll', onScroll) // solo una volta
            }
        }
        window.addEventListener('scroll', onScroll)

        // Tracciamento sottoscrizione Substack
        const substackIframe = document.getElementById('substack-iframe') as HTMLIFrameElement
        if (substackIframe) {
            window.addEventListener('message', e => {
                if (typeof e.data === 'string' && e.data.includes('substack:subscribe')) {
                    track('subscribed')
                    fetch('/api/log-click', {
                        method: 'POST',
                        body: JSON.stringify({ type: 'subscribed', landing: 'lost-in-the-shell' }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                }
            })
        }

        return () => window.removeEventListener('scroll', onScroll)
    }, [])




    const logClick = async (type: string) => {
        await fetch('/api/log-click', {
            method: 'POST',
            body: JSON.stringify({ type, landing: 'lost-in-the-shell' }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }


/*    const handleAmazonClick = () => {
        logClick('amazon')
        track('amazon click')
        window.location.href = 'https://a.co/d/b76kusy'
    }*/

    const handleDownloadClick = () => {
        logClick('download')
        track('download click')
        window.open('/extract.pdf', '_blank')
    }

    const handleArrowClick = () => {
        logClick('clickarrow')
        track('clickarrow')
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }

    const [showModal, setShowModal] = useState(false)

    const handleMarketClick = (url: string, market: string) => {
        logClick(`amazon-${market}`)
        track(`amazon ${market}`)
        window.open(url, '_blank')
        setShowModal(false)
    }

    return (
        <>
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
                    <button className="btn flex items-center gap-2"   onClick={() => {
                        setShowModal(true)
                        logClick('amazon-modal')
                        track('amazon modal open')
                    }}>
                        <Image
                            src="/amazon.svg"
                            alt="Amazon"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
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
                <div className="scroll-down-indicator" onClick={handleArrowClick}>
                    ↓
                </div>
                <div className="hero-fade" />
            </section>

            <section className="author-section max-w-2xl mx-auto text-white px-6 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">About the Author</h2>

                <p className="text-lg leading-relaxed mb-4">
                    Some stories ask <em>“What if?”</em> and don’t settle for easy answers. I’ve been chasing those kinds of stories for as long as I can remember — the ones that <strong>haunt, provoke, linger</strong>.
                    Maybe only a few of us are looking for them, but if you’ve landed here, <strong>I’m guessing you’re one of us</strong>.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    I’m not here to hand out easy narratives. I want to offer you something that <em>burns slow</em>, <em>sticks to your thoughts</em>, and <em>won’t leave you indifferent</em>.
                    <strong>Or I&apos;ll try.</strong>
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    <strong>I’m MBM.</strong><br />
                    I write science fiction that <em>asks questions</em>, <em>breaks rules</em>, and sometimes <em>makes you laugh at things you probably shouldn’t</em>.
                    If you’re into <strong>strange futures, artificial minds, and stories that bend reality</strong> just enough to make you think — welcome.
                    <strong>You’ve found the right corner.</strong>
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    When I’m not world-building or chasing weird ideas down rabbit holes, I write about speculative tech and sci-fi culture for magazines and digital platforms.
                    I also run <strong>Around SciFi</strong>, a column on Substack where I connect dots between fiction, the future, and everything in between.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    Off the page, I’m a husband, a father, and a consultant doing my best to stay grounded — though <em>my imagination clearly didn’t get that memo</em>.
                </p>

                <p className="text-lg leading-relaxed">
                    Are you a <strong>page-thinker kind of reader?</strong><br />
                    Stick around. There’s plenty to explore.
                </p>

                <button
                    className="btn secondary"
                    onClick={() => {
                        logClick('substack')
                        track('substack click')
                        window.open('https://aroundscifi.substack.com', '_blank')
                    }}
                >
                    ✉️ Visit Substack Page
                </button>

                <div className="substack-form bg-white rounded shadow-md p-4 max-w-md mx-auto">
                    <iframe
                        src="https://aroundscifi.substack.com/embed"
                        width="100%"
                        height="160"
                        style={{ border: 'none', background: 'white' }}
                        frameBorder="0"
                        scrolling="no"
                    />
                </div>
            </section>
            <footer className="text-center text-sm text-white opacity-60 py-6">
                <p className="text-xs opacity-50 text-center mt-12">
                    This site does not use cookies. Only anonymized interaction data is collected for analytics and performance improvements.
                </p>

                <p>
                    © {new Date().getFullYear()} Michael B. Morgan ·{' '}
                    <a href="/privacy" className="underline hover:text-purple-400">
                        Privacy
                    </a>
                </p>
            </footer>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">Choose your Amazon Store</h2>
                        <div className="space-y-2">
                            <button onClick={() => handleMarketClick('https://a.co/d/8BPRzrN', 'usa')} className="btn w-full">
                                🇺🇸 USA (amazon.com)
                            </button>
                            <button onClick={() => handleMarketClick('https://amzn.eu/d/evbgXOk', 'uk')} className="btn w-full">
                                🇬🇧 UK (amazon.co.uk)
                            </button>
                            <button onClick={() => handleMarketClick('https://a.co/d/iR6z9FP', 'canada')} className="btn w-full">
                                🇨🇦 Canada (amazon.ca)
                            </button>
                            <button onClick={() => handleMarketClick('https://amzn.asia/d/0Xbe6XU', 'australia')} className="btn w-full">
                                🇦🇺 Australia (amazon.com.au)
                            </button>
                        </div>
                        <button className="btn secondary mt-6" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
