// Pollinations StretchText Content Engine
(function() {
    console.log("🌸 Pollinations StretchText initialized!");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "stretchify") {
            stretchifyPage();
            sendResponse({ status: "done" });
        }
    });

    async function stretchifyPage() {
        const paragraphs = document.querySelectorAll("p, article p, main p");
        if (!paragraphs.length) return;

        paragraphs.forEach(p => {
            if (p.innerText.length > 120 && !p.hasAttribute("data-stretched")) {
                p.setAttribute("data-stretched", "true");
                applyStretchNodes(p);
            }
        });
    }

    function applyStretchNodes(pElement) {
        const text = pElement.innerText;
        const sentences = text.split(". ");
        if (sentences.length <= 1) return;

        const summary = sentences[0] + ".";
        const details = sentences.slice(1).join(". ");

        pElement.innerHTML = `
            <span>${summary}</span> 
            <span class="polli-stretch-wrapper" title="Click to unfold detail" data-state="collapsed">
                [+]
            </span>
            <span class="polli-stretch-details" style="display:none;"> ${details}</span>
        `;

        const btn = pElement.querySelector(".polli-stretch-wrapper");
        const detailsSpan = pElement.querySelector(".polli-stretch-details");

        btn.addEventListener("click", () => {
            if (btn.getAttribute("data-state") === "collapsed") {
                btn.setAttribute("data-state", "expanded");
                btn.innerText = "[-]";
                detailsSpan.style.display = "inline";
                detailsSpan.classList.add("polli-stretch-expanded");
            } else {
                btn.setAttribute("data-state", "collapsed");
                btn.innerText = "[+]";
                detailsSpan.style.display = "none";
            }
        });
    }
})();
