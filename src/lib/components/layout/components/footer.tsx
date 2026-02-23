import { ThemeToggle } from '@/lib/components/theme-toggle';

const Footer = () => {
  return (
    <footer>
      <div className="flex items-center gap-2">
        <p className="text-xs">
          {new Date().getFullYear()} -{' '}
          <a
            href="https://agustinusnathaniel.com?ref=wa.sznm.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            agustinusnathaniel.com
          </a>
        </p>

        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
