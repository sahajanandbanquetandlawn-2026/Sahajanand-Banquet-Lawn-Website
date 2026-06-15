import { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import './PWAInstallPrompt.css';

// Define BeforeInstallPromptEvent for TypeScript
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Store the event so we can trigger it later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user dismissed it in this session
      const isDismissed = sessionStorage.getItem('pwa-prompt-dismissed');
      if (!isDismissed) {
        // Show the prompt with a delay for better onboarding UX
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If app is already running in standalone mode (installed), clear state
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setDeferredPrompt(null);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Trigger the browser's install prompt
    deferredPrompt.prompt();
    
    // Wait for the user's action
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Mark as dismissed for the session so it doesn't show up again on page transitions
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!isVisible || !deferredPrompt) return null;

  return (
    <div className="pwa-install-container">
      <div className="pwa-install-card">
        <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Close install prompt">
          <X size={18} />
        </button>
        <div className="pwa-icon-wrapper">
          <div className="pwa-app-logo">
            <img src="/icon-180.png" alt="Sahajanand Banquet & Lawn Logo" />
          </div>
          <div className="pwa-sparkle">
            <Sparkles size={14} className="sparkle-icon" />
          </div>
        </div>
        <div className="pwa-content">
          <h3>Install Sahajanand App</h3>
          <p>Install our web app for a seamless experience, offline access, and easy booking.</p>
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            <Download size={16} />
            <span>Install App</span>
          </button>
        </div>
      </div>
    </div>
  );
}
