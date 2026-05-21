import { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: Record<string, unknown>;
  id: string;
}

/**
 * Injects a JSON-LD structured data script into the document <head>.
 * Automatically cleans up on unmount to avoid duplicate schemas on navigation.
 */
const SchemaMarkup = ({ schema, id }: SchemaMarkupProps) => {
  useEffect(() => {
    const scriptId = `schema-${id}`;
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.textContent = JSON.stringify(schema);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [schema, id]);

  return null;
};

export default SchemaMarkup;
