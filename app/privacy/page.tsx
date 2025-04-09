export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 text-white">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4">
                This website does not use tracking cookies or advertising technologies.
                No personal data is stored or processed for profiling, targeting, or marketing.
            </p>

            <p className="mb-4">
                We collect anonymized interaction data such as page views, click events, and approximate location based on IP address. This data is stored securely and used only to improve the experience and performance of the site.
            </p>

            <p className="mb-4">
                If you subscribe to the newsletter via Substack, your data is processed directly by Substack under their own privacy terms. You can review their privacy policy here:{' '}
                <a
                    href="https://substack.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-purple-400 hover:text-purple-300"
                >
                    Substack Privacy Policy
                </a>
                .
            </p>

            <p className="mb-4">
                If you have questions or concerns about how data is handled, you may contact the site operator via the Substack page.
            </p>

            <p className="text-sm opacity-60">Last updated: April 2025</p>
        </main>
    )
}
