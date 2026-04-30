export default function Footer() {
  return (
    <footer role="contentinfo"
            className="py-6 text-center text-xs"
            style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
      <p>CrimsonReel · Datos de{' '}
        <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer"
           className="underline hover:text-[#C0395A] transition-colors">
          TVMaze API
        </a>
      </p>
    </footer>
  )
}