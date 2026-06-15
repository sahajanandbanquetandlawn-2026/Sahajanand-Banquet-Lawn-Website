import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, state } = useLocation();
  const handledRef = useRef(false);

  useEffect(() => {
    const navState = state as { scrollGalleryToContact?: boolean } | null;

    if (navState?.scrollGalleryToContact) {
      // Mark as handled so the state-clear re-render doesn't scroll to top
      handledRef.current = true;

      // Step 1: Jump instantly to the gallery section
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
      }

      // Step 2: After a pause, slowly scroll down to contact section
      setTimeout(() => {
        const contact = document.getElementById('contact');
        if (contact) {
          contact.scrollIntoView({ behavior: 'smooth' });
        }
        // Reset the flag after everything is done
        setTimeout(() => { handledRef.current = false; }, 2000);
      }, 1200);

      // Clear the state from history so refresh doesn't re-trigger
      window.history.replaceState({}, '');
      return;
    }

    // Skip if we just handled the gallery-to-contact flow
    if (handledRef.current) return;

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state]);

  return null;
}
