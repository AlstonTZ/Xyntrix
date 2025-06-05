document.addEventListener("DOMContentLoaded", function() {
    const terminal = document.getElementById("terminal");
    const codeEditor = document.getElementById("codeEditor");
    const hackButton = document.getElementById("hackButton");

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "Anonymous";
    const site = params.get("site") || "unknown";

    const lines = [
        `User ${name} authenticated.`,
        `Establishing secure connection...`,
        `Connecting to ${site}...`,
        `Bypassing firewall...`,
        `Extracting data...`,
        `Simulation complete. Target breached successfully.`,
        `System log has been updated.`,
    ];

    let lineIndex = 0;

    function typeLine(text, i = 0, callback) {
        if (i < text.length) {
            terminal.innerHTML += text.charAt(i);
            setTimeout(() => typeLine(text, i + 1, callback), 30);
        } else {
            terminal.innerHTML += "\n";
            callback();
        }
    }

    function typeNextLine() {
        hackButton.style.display = "none";

        if (lineIndex < lines.length) {
            typeLine(lines[lineIndex], 0, function() {
            lineIndex++;
            setTimeout(typeNextLine, 500);
            });
        } else {
            terminal.innerHTML = "";
            codeEditor.style.display = "block";
            hackButton.style.display = "block";
            codeEditor.focus();
        }
        }

    typeNextLine();

    if (site) {
        hackButton.textContent = `HACK ${site.toUpperCase()}`;
    }

    codeEditor.addEventListener("keydown", function(e) {
        const openingBrackets = {
            "(": ")",
            "{": "}",
            "[": "]",
            "\"": "\"",
            "'": "'",
            "`": "`",
            "<": ">",
            "#": "#",
        };

        if (e.key === "Tab") {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            codeEditor.value =
                codeEditor.value.substring(0, start) + "\t" + codeEditor.value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 1;
        } else if (e.key === "Enter") {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const value = codeEditor.value;
            const lineStart = value.lastIndexOf("\n", start - 1) + 1;
            const currentLine = value.substring(lineStart, start);
            const indentMatch = currentLine.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : "";
            const before = value.substring(0, start);
            const after = value.substring(codeEditor.selectionEnd);
            const insertText = "\n" + indent;
            codeEditor.value = before + insertText + after;
            const cursorPos = start + insertText.length;
            codeEditor.selectionStart = codeEditor.selectionEnd = cursorPos;
        } else if (openingBrackets.hasOwnProperty(e.key)) {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            const value = codeEditor.value;
            const open = e.key;
            const close = openingBrackets[open];
            codeEditor.value =
                value.substring(0, start) + open + close + value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 1;
        }
    });

    hackButton.addEventListener("click", function() {
        terminal.innerHTML = "";
        const hackLines = [
            `Launching attack on ${site}...`,
            `Sending exploit packets...`,
            `Firewall bypass successful.`,
            `Accessing internal systems...`,
            `Planting backdoor...`,
            `Downloading database...`,
            `Encrypting logs...`,
            `Target compromised. Mission success.`,
            `You may close this tab now.`
        ];
        lineIndex = 0;
        lines.length = 0;
        lines.push(...hackLines);
        typeNextLine();
    });
});
