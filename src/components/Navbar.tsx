import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
export function Logo() { return <span className="logo"><img src={`${import.meta.env.BASE_URL}images/pivot-logo.png`} alt="Pivot" width="2172" height="724" /></span> }
export default function Navbar() {
 const [open, setOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)
 useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
 useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
 return <header className={`navbar ${scrolled || open ? 'is-scrolled' : ''}`}><nav className="nav-inner" aria-label="Main navigation"><a href="#" aria-label="Pivot home" onClick={() => setOpen(false)}><Logo /></a><div className="desktop-nav">{[['Product','product'],['How It Works','how-it-works'],['Vision','vision'],['FAQ','faq']].map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><a className="nav-cta" href="#beta">Join the Beta <ArrowUpRight size={16}/></a><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></nav>{open && <div id="mobile-nav" className="mobile-nav">{[['Product','product'],['How It Works','how-it-works'],['Vision','vision'],['FAQ','faq'],['Join the Beta','beta']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}</div>}</header>
}
