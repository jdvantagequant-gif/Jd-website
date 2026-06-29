function getLegalPage() {
    return '<div class="dash-card" style="padding:0;overflow:hidden;">' +
        '<div class="legal-tabs">' +
            '<button class="legal-tab active" data-tab="disclaimers-content" onclick="switchLegalTab(\'disclaimers-content\')">SEBI Disclaimers</button>' +
            '<button class="legal-tab" data-tab="terms-content" onclick="switchLegalTab(\'terms-content\')">Terms of Use</button>' +
            '<button class="legal-tab" data-tab="privacy-content" onclick="switchLegalTab(\'privacy-content\')">Privacy Policy</button>' +
            '<button class="legal-tab" data-tab="refund-content" onclick="switchLegalTab(\'refund-content\')">Refund Policy</button>' +
        '</div>' +
        '<div style="padding:var(--space-6);">' +

            '<div id="disclaimers-content" class="legal-tab-content active legal-section">' +
                '<h3>SEBI Disclaimers &amp; Risk Disclosure</h3>' +
                '<p><strong>Last Updated:</strong> January 2025</p>' +
                '<h3>Important Notice</h3>' +
                '<p>J&amp;D Vantage Quant is a technology and research-focused firm. We provide algorithmic trading strategies, quantitative analysis tools, and related services. We are SEBI compliant but <strong>not</strong> a SEBI-registered portfolio manager, investment adviser, or stockbroker.</p>' +
                '<h3>Risk Disclosure</h3>' +
                '<ul>' +
                    '<li>Trading in securities, derivatives, and commodities is subject to market risks.</li>' +
                    '<li>Past performance of any strategy is NOT indicative of future results.</li>' +
                    '<li>Algorithmic trading involves specific risks including technology failure, connectivity issues, and rapid market changes.</li>' +
                    '<li>Options and futures trading carries a high level of risk and is not suitable for all investors.</li>' +
                    '<li>You may lose more than your initial investment in leveraged trading.</li>' +
                '</ul>' +
                '<h3>No Guaranteed Returns</h3>' +
                '<p>We do not promise or guarantee any specific returns. Markets are inherently unpredictable and no algorithm can guarantee profits. All P&amp;L figures shared are for informational purposes only.</p>' +
                '<h3>SEBI Compliance</h3>' +
                '<p>Clients are responsible for ensuring their trading activities comply with SEBI regulations. We recommend consulting a SEBI-registered investment adviser before making investment decisions.</p>' +
            '</div>' +

            '<div id="terms-content" class="legal-tab-content legal-section">' +
                '<h3>Terms of Use</h3>' +
                '<p><strong>Effective Date:</strong> January 2025</p>' +
                '<h3>Acceptance of Terms</h3>' +
                '<p>By accessing jdvantagequant.com, you agree to these Terms of Use and our Privacy Policy.</p>' +
                '<h3>Services</h3>' +
                '<p>We provide algorithmic trading strategy development, quantitative research, backtesting services, and related consultation. Services are subject to availability and may be modified without notice.</p>' +
                '<h3>User Obligations</h3>' +
                '<ul>' +
                    '<li>You must be at least 18 years of age to use our services.</li>' +
                    '<li>You are responsible for maintaining the confidentiality of your account information.</li>' +
                    '<li>You agree not to use our services for any unlawful purpose.</li>' +
                    '<li>You understand that trading involves risk and accept full responsibility for your decisions.</li>' +
                '</ul>' +
                '<h3>Intellectual Property</h3>' +
                '<p>All content, strategies, algorithms, and research materials are the intellectual property of J&amp;D Vantage Quant. Unauthorised reproduction or distribution is prohibited.</p>' +
                '<h3>Limitation of Liability</h3>' +
                '<p>J&amp;D Vantage Quant shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or trading strategies.</p>' +
            '</div>' +

            '<div id="privacy-content" class="legal-tab-content legal-section">' +
                '<h3>Privacy Policy</h3>' +
                '<p><strong>Effective Date:</strong> January 2025</p>' +
                '<h3>Information We Collect</h3>' +
                '<ul>' +
                    '<li>Name, email address, and phone number when you contact us</li>' +
                    '<li>Usage data and analytics (anonymised)</li>' +
                    '<li>Communication records for service improvement</li>' +
                '</ul>' +
                '<h3>How We Use Your Information</h3>' +
                '<ul>' +
                    '<li>To provide and improve our services</li>' +
                    '<li>To communicate with you about inquiries and updates</li>' +
                    '<li>To analyse website usage and improve user experience</li>' +
                    '<li>To comply with legal obligations</li>' +
                '</ul>' +
                '<h3>Data Protection</h3>' +
                '<p>We implement appropriate technical and organisational measures to protect your personal data. We do not sell or share your data with third parties except as required by law.</p>' +
                '<h3>Your Rights</h3>' +
                '<p>You have the right to access, correct, or delete your personal data. Contact us at jdvantagequant@gmail.com for any data-related requests.</p>' +
            '</div>' +

            '<div id="refund-content" class="legal-tab-content legal-section">' +
                '<h3>Refund &amp; Cancellation Policy</h3>' +
                '<p><strong>Effective Date:</strong> January 2025</p>' +
                '<h3>Consultation Services</h3>' +
                '<p>Consultation fees are non-refundable once the session has been conducted. Cancellations made 24 hours before a scheduled session will receive a full refund.</p>' +
                '<h3>Strategy Development</h3>' +
                '<p>Custom strategy development fees are non-refundable once work has commenced. Milestone-based refunds may be available depending on the stage of development.</p>' +
                '<h3>Subscription Services</h3>' +
                '<p>If applicable, subscription services may be cancelled before the next billing cycle. No partial refunds for unused portions of the billing period.</p>' +
                '<h3>Contact for Refunds</h3>' +
                '<p>For refund requests, email us at <a href="mailto:jdvantagequant@gmail.com" style="color:var(--color-primary);">jdvantagequant@gmail.com</a> with your details.</p>' +
            '</div>' +

        '</div>' +
    '</div>';
}

function getDisclaimersPage() { return getLegalPage(); }
function getTermsPage() { return getLegalPage(); }
function getPrivacyPage() { return getLegalPage(); }
function getRefundPage() { return getLegalPage(); }