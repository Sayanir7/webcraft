export const downloadCodeFiles = (code) => {
    const { html = '', css = '', script = '' } = code;
  
    // Helper function to create and trigger download
    const downloadFile = (content, filename) => {
      // Create blob with appropriate type
      const type = filename.endsWith('js') ? 'application/javascript' : 
                   filename.endsWith('css') ? 'text/css' : 
                   'text/html';
      
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke URL to free up memory
      setTimeout(() => URL.revokeObjectURL(url), 100);
    };
  
    // Download each file if content exists
    if (html.trim()) downloadFile(html, 'index.html');
    if (css.trim()) downloadFile(css, 'style.css');
    if (script.trim()) downloadFile(script, 'script.js');
  };