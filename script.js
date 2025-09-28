// Anti-Phishing Educational Site JavaScript

// Show educational content modal
function showEducationalContent() {
    const modal = document.getElementById('educationalModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close educational content modal
function closeEducationalContent() {
    const modal = document.getElementById('educationalModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Redirect to real Microsoft website
function goToRealMicrosoft() {
    if (confirm('Are you sure you want to leave this educational site and go to the real Microsoft website?')) {
        window.open('https://www.microsoft.com', '_blank');
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('educationalModal');
    if (event.target === modal) {
        closeEducationalContent();
    }
}

// Add interactive elements to demonstrate phishing techniques
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for educational purposes
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPhishingAlert();
        });
    });
    
    // Add form interaction warnings
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.classList.contains('learn-more-btn') && !button.classList.contains('real-site-btn')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showPhishingAlert();
            });
        }
    });
});

// Show phishing alert when users try to interact with fake elements
function showPhishingAlert() {
    alert('🚨 PHISHING ALERT! 🚨\n\nIn a real phishing attack, clicking these links could:\n• Steal your login credentials\n• Install malware on your device\n• Redirect you to malicious sites\n• Access your personal information\n\nThis is why it\'s important to always verify URLs and be cautious with links!');
}

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        closeEducationalContent();
    }
    
    // L key to show educational content
    if (e.key === 'l' || e.key === 'L') {
        showEducationalContent();
    }
});

// Add visual indicators for educational purposes
function addEducationalIndicators() {
    // Add subtle indicators to show this is a demonstration
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a::after {
            content: " (FAKE)";
            color: #ff4444;
            font-size: 10px;
            font-weight: bold;
        }
        
        .product-card::before {
            content: "DEMO";
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4444;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 10;
        }
        
        .product-card {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

// Initialize educational indicators after page load
window.addEventListener('load', function() {
    addEducationalIndicators();
    
    // Show initial educational message
    setTimeout(function() {
        if (!localStorage.getItem('phishing-demo-visited')) {
            showEducationalContent();
            localStorage.setItem('phishing-demo-visited', 'true');
        }
    }, 2000);
});

// Add hover effects to show this is educational
document.addEventListener('mouseover', function(e) {
    if (e.target.tagName === 'A' && !e.target.classList.contains('learn-more-btn') && !e.target.classList.contains('real-site-btn')) {
        e.target.style.border = '2px dashed #ff4444';
        e.target.style.backgroundColor = '#fff4ce';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.tagName === 'A' && !e.target.classList.contains('learn-more-btn') && !e.target.classList.contains('real-site-btn')) {
        e.target.style.border = 'none';
        e.target.style.backgroundColor = 'transparent';
    }
});

// Console message for developers
console.log(`
🚨 ANTI-PHISHING EDUCATIONAL SITE 🚨

This is a demonstration site created to educate users about phishing attacks.
The real Microsoft website is at: https://www.microsoft.com

Key differences to notice:
- URL: rnicrosof.space vs microsoft.com
- Warning banners and educational content
- Interactive elements that show phishing techniques

This site is for educational purposes only.
`);

// Add analytics tracking for educational purposes (fake)
function trackEducationalInteraction(action) {
    console.log(`Educational interaction tracked: ${action}`);
    // In a real educational site, you might send this data to analytics
}

// Track various user interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('learn-more-btn')) {
        trackEducationalInteraction('learn_more_clicked');
    } else if (e.target.classList.contains('real-site-btn')) {
        trackEducationalInteraction('real_site_clicked');
    } else if (e.target.tagName === 'A') {
        trackEducationalInteraction('fake_link_clicked');
    }
});
