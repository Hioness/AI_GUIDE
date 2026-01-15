document.addEventListener('DOMContentLoaded', () => {
  const personaInput = document.getElementById('persona');
  const contextInput = document.getElementById('context');
  const taskInput = document.getElementById('task');
  const formatInput = document.getElementById('format');
  const examplesInput = document.getElementById('examples');
  const previewContent = document.getElementById('previewContent');
  const copyButton = document.getElementById('copyButton');

  const resizeTextarea = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const updatePreview = () => {
    const persona = personaInput.value.trim();
    const context = contextInput.value.trim();
    const task = taskInput.value.trim();
    const format = formatInput.value.trim();
    const examples = examplesInput.value.trim();

    let parts = [];

    if (persona) {
      parts.push(`You are ${persona}.`);
    }

    if (context) {
      parts.push(`Context: ${context}`);
    }

    parts.push(`Task: ${task}`);

    if (format) {
      parts.push(`Output: ${format}`);
    }

    parts.push(`If unclear/unknown: Say "I don't know" exactly.`);

    if (examples) {
      parts.push(`Examples/Constraints: ${examples}`);
    }

    const generatedPrompt = parts.join('\n\n');

    previewContent.textContent = generatedPrompt;
  };

  const copyPrompt = async () => {
    const textToCopy = previewContent.textContent;
    const originalText = copyButton.textContent;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copyButton.textContent = '✔ COPIED TO CLIPBOARD';
    } catch (err) {
      console.error('Copy failed', err);
      copyButton.textContent = 'COPY FAILED';
    }

    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 2000);
  };

  const inputs = [personaInput, contextInput, taskInput, formatInput, examplesInput];

  inputs.forEach((el) => {
    resizeTextarea(el);
    el.addEventListener('input', (event) => {
      resizeTextarea(event.target);
      updatePreview();
    });
  });

  copyButton.addEventListener('click', copyPrompt);

  updatePreview();
});
