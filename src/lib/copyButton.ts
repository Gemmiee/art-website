export function bindCopyButton(
  copyBtn: HTMLButtonElement | null,
  fallbackInput: HTMLInputElement | null
) {
  if (!copyBtn) return;
  const defaultLabel = copyBtn.textContent || 'Copy';
  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.copyText || '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      fallbackInput?.select();
      document.execCommand('copy');
    }
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = defaultLabel;
    }, 1500);
  });
}
