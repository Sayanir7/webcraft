function Footer() {
  const footerLinks = [
    { name: "About", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-primary border-t border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-secondary_text">
            <span className="font-medium">
              <span className="text-accent">Web</span>
              <span className="text-primary_text">Craft</span>
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <ul className="flex flex-wrap gap-4 text-sm">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-secondary_text hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;