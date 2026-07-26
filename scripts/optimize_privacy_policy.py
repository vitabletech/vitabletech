import os

file_path = "/Users/mayanksinghkushwah/Documents/gitProjectes/vitabletech/policies/privacy-policy.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We will locate the block from <h2 class="text-2xl font-bold mt-8 mb-4">Privacy Policy</h2> to the end of the Grievance Officer section.
start_marker = '<h2 class="text-2xl font-bold mt-8 mb-4">Privacy Policy</h2>'
end_marker = '</p>\n            </div>'

if start_marker in content and end_marker in content:
    start_index = content.find(start_marker)
    end_index = content.find(end_marker, start_index)
    
    new_html = """<h2 class="text-2xl font-bold mt-8 mb-4">Privacy Policy</h2>

                <h3 class="text-xl font-bold mt-6 mb-3">Introduction</h3>
                <p class="mb-4">This Privacy Policy describes how <strong>Vitabletech</strong> and its affiliates (collectively "Vitabletech", "we", "our", "us") collect, use, share, and protect your personal data through our website <strong>https://vitabletech.in</strong>.</p>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>By visiting our platform or using our services, you agree to this Privacy Policy.</li>
                    <li>If you do not agree with these terms, please do not use our platform.</li>
                    <li>We do not offer services outside India, and your data is primarily stored and processed in India.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Data Collection</h3>
                <p class="mb-4">We collect your personal data when you interact with our platform. You always have the option to withhold information by choosing not to use a specific feature.</p>
                
                <h4 class="text-lg font-semibold mt-4 mb-2">What we collect:</h4>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Basic Information:</strong> Name, address, phone number, and email ID during registration.</li>
                    <li><strong>Sensitive Data:</strong> Payment details (bank account, credit/debit cards) or biometric data, collected only with your explicit consent.</li>
                    <li><strong>Usage Data:</strong> We track your behavior and preferences to aggregate and analyze platform usage.</li>
                    <li><strong>Transaction Data:</strong> Information related to your purchases and interactions with our business partners.</li>
                </ul>
                <p class="mb-4 text-sm bg-blue-50 p-3 rounded border border-blue-100"><strong>Security Warning:</strong> Vitabletech will never call or email you asking for your PIN, passwords, or banking credentials. If you receive such a request, report it immediately to law enforcement.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">How We Use Your Data</h3>
                <p class="mb-4">We use your personal data to provide and improve our services. You can opt-out of marketing communications at any time.</p>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li>Fulfilling orders and enhancing customer experience.</li>
                    <li>Resolving disputes and troubleshooting technical problems.</li>
                    <li>Customizing your experience and keeping you informed about new products or offers.</li>
                    <li>Detecting and protecting against fraud, errors, and criminal activity.</li>
                    <li>Conducting market research and analytical surveys.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Data Sharing</h3>
                <p class="mb-4">We may share your data to provide access to our services, comply with legal obligations, or enforce our terms.</p>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Internal Sharing:</strong> With our corporate affiliates and group entities for service delivery and marketing.</li>
                    <li><strong>Third Parties:</strong> With logistics partners, payment processors, and business partners.</li>
                    <li><strong>Legal Authorities:</strong> With law enforcement or government agencies if required by law, or to protect the rights, property, and safety of our users.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Security Precautions</h3>
                <p class="mb-4">We adopt reasonable security practices to protect your data from unauthorized access or disclosure. We use secure servers for your account information.</p>
                <p class="mb-4">However, internet transmission is never completely secure. By using our platform, you accept these inherent risks. You are fully responsible for keeping your login credentials confidential and safe.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Data Deletion and Retention</h3>
                <p class="mb-4">You have the right to manage your data lifecycle with us:</p>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Account Deletion:</strong> You can delete your account via your profile settings, which removes all associated information.</li>
                    <li><strong>Pending Issues:</strong> We may delay deletion if there are unresolved grievances, claims, or pending shipments.</li>
                    <li><strong>Retention:</strong> We only keep your personal data as long as necessary for the purpose it was collected, or as required by law.</li>
                    <li><strong>Anonymization:</strong> We may retain anonymized data indefinitely for research and analytical purposes.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Your Rights & Consent</h3>
                <p class="mb-4">You may access, update, and rectify your personal data directly through our platform functionalities.</p>
                <ul class="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                    <li><strong>Providing Consent:</strong> By visiting our platform, you consent to this Privacy Policy. If you provide another person's data, you represent that you have their authority to do so.</li>
                    <li><strong>Communication:</strong> You consent to us contacting you via SMS, email, or calls regarding our services.</li>
                    <li><strong>Withdrawing Consent:</strong> You may withdraw your consent by emailing our Grievance Officer with the subject "Withdrawal of consent for processing personal data". This will not be retrospective and may result in the restriction of our services.</li>
                </ul>

                <h3 class="text-xl font-bold mt-6 mb-3">Changes to this Policy</h3>
                <p class="mb-4">We may periodically update this Privacy Policy to reflect changes in our practices. We will notify you of any significant changes as required by applicable laws.</p>

                <h3 class="text-xl font-bold mt-6 mb-3">Grievance Officer</h3>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p class="mb-1"><strong>Name:</strong> Grievance Officer</p>
                    <p class="mb-1"><strong>Designation:</strong> Managing Director</p>
                    <p class="mb-1"><strong>Company:</strong> Vitabletech Gwalior</p>
                    <p class="mb-1"><strong>Phone:</strong> <a href="tel:+916280671085" class="text-primary hover:underline">+91-6280671085</a></p>
                    <p class="mb-1"><strong>Email:</strong> <a href="mailto:info@vitabletech.in" class="text-primary hover:underline">info@vitabletech.in</a></p>
                    <p class="mb-0"><strong>Time:</strong> Monday - Friday (9:00 - 18:00)</p>"""

    new_content = content[:start_index] + new_html + content[end_index:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Privacy Policy successfully optimized.")
else:
    print("Could not find the markers in the file.")
