document.addEventListener('DOMContentLoaded', () => {
    // Spotlight Effect for Cyber Cards (Landing Page)
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Arena Logic (Only runs if elements exist)
    const submitBtn = document.getElementById('submitBtn');
    const runBtn = document.getElementById('runBtn');
    const codeEditor = document.getElementById('codeEditor');
    const languageSelect = document.getElementById('language');
    const statusMessage = document.getElementById('statusMessage');
    const customInput = document.getElementById('customInput');
    const terminalOutput = document.getElementById('terminalOutput');

    if (runBtn && submitBtn) {
        runBtn.addEventListener('click', async () => {
            const code = codeEditor.value;
            const language = languageSelect.value;
            const input = customInput.value;

            if (!code.trim()) {
                showStatus('Please enter some code.', 'error');
                return;
            }

            runBtn.disabled = true;
            runBtn.textContent = 'Running...';
            terminalOutput.value = 'Executing...';

            try {
                const response = await fetch('http://localhost:8080/api/run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, language, input })
                });

                const data = await response.json();

                if (response.ok) {
                    terminalOutput.value = data.output || 'No output';
                    if (data.stderr) {
                        terminalOutput.value += '\n\n[Errors]:\n' + data.stderr;
                    }
                } else {
                    terminalOutput.value = `Error: ${data.error}`;
                }
            } catch (err) {
                terminalOutput.value = 'Failed to connect to backend server.';
            } finally {
                runBtn.disabled = false;
                runBtn.textContent = 'Run Code';
            }
        });

        submitBtn.addEventListener('click', async () => {
            const code = codeEditor.value;
            const language = languageSelect.value;

            if (!code.trim()) {
                showStatus('Please enter some code.', 'error');
                return;
            }

            // Show pending state
            showStatus('Submitting to Judge...', 'pending');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            try {
                // This URL points to our Go Backend
                const response = await fetch('http://localhost:8080/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: 1, // Hardcoded for MVP
                        problem_id: 1, // Hardcoded for MVP
                        code: code,
                        language: language
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    showStatus(`Submission Queued! ID: ${data.submission_id}. Waiting for execution...`, 'success');
                    // In Phase 2, we will add polling here to check if the background worker finished running it
                } else {
                    showStatus(`Error: ${data.error}`, 'error');
                }
            } catch (err) {
                showStatus('Failed to connect to backend server. Is it running on :8080?', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Code';
            }
        });

        function showStatus(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = `status ${type}`;
        }
    }
});
