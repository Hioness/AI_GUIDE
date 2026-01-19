document.addEventListener('DOMContentLoaded', () => {
  const personaInput = document.getElementById('persona');
  const contextInput = document.getElementById('context');
  const taskInput = document.getElementById('task');
  const formatInput = document.getElementById('format');
  const examplesInput = document.getElementById('examples');
  const previewContent = document.getElementById('previewContent');
  const copyButton = document.getElementById('copyButton');
  const resetButton = document.getElementById('resetButton');
  const resetConfirm = document.getElementById('resetConfirm');
  const confirmYes = document.getElementById('confirmYes');
  const confirmCancel = document.getElementById('confirmCancel');

  const storageKeys = {
    persona: 'forge-persona',
    context: 'forge-context',
    task: 'forge-task',
    format: 'forge-format',
    examples: 'forge-examples'
  };

  const defaultValues = {
    persona: 'an Experienced Prompt Engineer',
    context: 'I want to create an app with AI that helps people create better prompts',
    task: 'Make a prompt that will direct the LLM to produce the website, using a hacker green color and dark themed interface',
    format: 'The code for the website, how to organize the folder structure if any, and an explanation of any features added or decisions made',
    examples: "Don't use the generic colors that you always use. Avoid round corners and gray-blue UI elements."
  };

  const resizeTextarea = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const saveToStorage = () => {
    localStorage.setItem(storageKeys.persona, personaInput.value);
    localStorage.setItem(storageKeys.context, contextInput.value);
    localStorage.setItem(storageKeys.task, taskInput.value);
    localStorage.setItem(storageKeys.format, formatInput.value);
    localStorage.setItem(storageKeys.examples, examplesInput.value);
  };

  const loadFromStorage = () => {
    const savedPersona = localStorage.getItem(storageKeys.persona);
    const savedContext = localStorage.getItem(storageKeys.context);
    const savedTask = localStorage.getItem(storageKeys.task);
    const savedFormat = localStorage.getItem(storageKeys.format);
    const savedExamples = localStorage.getItem(storageKeys.examples);

    if (savedPersona !== null) personaInput.value = savedPersona;
    if (savedContext !== null) contextInput.value = savedContext;
    if (savedTask !== null) taskInput.value = savedTask;
    if (savedFormat !== null) formatInput.value = savedFormat;
    if (savedExamples !== null) examplesInput.value = savedExamples;
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

  const showResetConfirm = () => {
    resetButton.style.display = 'none';
    resetConfirm.style.display = 'flex';
  };

  const hideResetConfirm = () => {
    resetButton.style.display = 'block';
    resetConfirm.style.display = 'none';
  };

  const resetAllInputs = () => {
    personaInput.value = defaultValues.persona;
    contextInput.value = defaultValues.context;
    taskInput.value = defaultValues.task;
    formatInput.value = defaultValues.format;
    examplesInput.value = defaultValues.examples;

    [personaInput, contextInput, taskInput, formatInput, examplesInput].forEach(el => {
      resizeTextarea(el);
    });

    saveToStorage();
    updatePreview();
    hideResetConfirm();
  };

  const inputs = [personaInput, contextInput, taskInput, formatInput, examplesInput];

  loadFromStorage();

  inputs.forEach((el) => {
    resizeTextarea(el);
    el.addEventListener('input', (event) => {
      resizeTextarea(event.target);
      saveToStorage();
      updatePreview();
    });
  });

  copyButton.addEventListener('click', copyPrompt);
  resetButton.addEventListener('click', showResetConfirm);
  confirmYes.addEventListener('click', resetAllInputs);
  confirmCancel.addEventListener('click', hideResetConfirm);

  updatePreview();
});
