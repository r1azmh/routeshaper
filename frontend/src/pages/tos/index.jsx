import React from 'react';
import PropTypes from 'prop-types';

const Tos = () => {
    return (
        <div>
            <main className="container mx-auto p-6 md:p-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold leading-tight text-slate-900">RouteShaper — Privacy
                        Statement</h1>
                    <p className="mt-2 text-sm text-slate-600">This notice explains how RouteShaper handles personal
                        data for both the hosted service and the self-hosted software.</p>
                </div>

                <article className="bg-white shadow-sm rounded-lg p-6 prose prose-slate prose-max">
                    <section>
                        <h2>Scope</h2>
                        <p>
                            This notice covers two contexts:
                        </p>
                        <ul>
                            <li><strong>Hosted RouteShaper</strong> — the service we operate at <span
                                className="font-mono">routeshaper.live</span>.
                            </li>
                            <li><strong>Self-Hosted RouteShaper</strong> — the open-source software you deploy and
                                manage yourself.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>Who is the controller?</h2>
                        <ul>
                            <li><strong>Hosted RouteShaper:</strong> RouteShaper (we operate <span
                                className="font-mono">routeshaper.live</span>).
                            </li>
                            <li><strong>Self-Hosted RouteShaper:</strong> You / your organisation — you are the
                                controller for your deployment.
                            </li>
                        </ul>

                        <p>
                            <strong>Contact (Hosted):</strong>
                            <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm">
            routeshaper[at]gmail[dot]com
          </span>
                        </p>
                    </section>

                    <section>
                        <h2>What data we process (Hosted)</h2>
                        <ul>
                            <li><strong>Account &amp; authentication:</strong> username, hashed password, authentication
                                tokens.
                            </li>
                            <li><strong>Workspace content:</strong> jobs, vehicles, depots, coordinates/addresses,
                                uploads (e.g., CSVs), generated routes and emissions (these may include personal data if
                                you enter it).
                            </li>
                            <li><strong>Technical logs:</strong> IP addresses, timestamps, user agent strings, error
                                logs.
                            </li>
                            <li><strong>Cookies &amp; local storage:</strong> strictly necessary items for login and
                                session handling.
                            </li>
                        </ul>

                        <p className="mt-2"><strong>Self-Hosted:</strong> your deployment only processes the data you
                            configure; the open-source app does not send data to us by default.</p>
                    </section>

                    <section>
                        <h2>Why we process it &amp; legal bases</h2>
                        <ul>
                            <li>To provide the service and offer support.</li>
                            <li>For security, fraud prevention, and service improvement.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Sharing &amp; international transfers (Hosted)</h2>
                        <p>We may share data with:</p>
                        <ul>
                            <li>Processors/sub-processors (for example, our hosting provider and other trusted service
                                providers).
                            </li>
                            <li>Routing and mapping providers (for example, OpenStreetMap, OpenRouteService) when needed
                                to compute routes.
                            </li>
                            <li>Authorities or third parties when required for legal or safety reasons.</li>
                        </ul>
                        <p>As a result, data may be processed or stored outside your country.</p>
                    </section>

                    <section>
                        <h2>Retention</h2>
                        <ul>
                            <li><strong>Hosted — Account &amp; workspace data:</strong> retained while your account is
                                active and deleted or anonymised on request, subject to legal and operational needs.
                            </li>
                            <li><strong>Hosted — Logs:</strong> retained for a limited period necessary for security and
                                troubleshooting.
                            </li>
                            <li><strong>Self-Hosted:</strong> retention is configured by the operator of the deployment.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>Your rights</h2>
                        <p>You may request deletion of your data or withdraw consent at any time.</p>
                        <p><strong>Hosted deletion requests:</strong> contact us at the address above (<span
                            className="font-mono">routeshaper[at]gmail[dot]com</span>).</p>
                        <p><strong>Self-Hosted:</strong> contact the operator of that deployment.</p>
                    </section>

                    <section>
                        <h2>Security</h2>
                        <p>We use appropriate technical and organisational measures to protect personal data. No system
                            is perfectly secure; we continually work to improve protections.</p>
                    </section>

                    <section>
                        <h2>Children</h2>
                        <p>RouteShaper is intended for professional users and is not aimed at children under 16.</p>
                    </section>

                    <section>
                        <h2>Changes to this notice</h2>
                        <p>We may update this privacy notice from time to time. We will post changes here and, where
                            appropriate, notify users within the service.</p>
                    </section>

                    <section>
                        <h2>Self-Hosted operators — your responsibilities</h2>
                        <p>If you deploy RouteShaper yourself, you are the data controller for that deployment. Your
                            responsibilities include:</p>
                        <ul>
                            <li>Providing your own privacy notice to your users.</li>
                            <li>Choosing and enforcing retention policies.</li>
                            <li>Securing your deployment and data.</li>
                            <li>Ensuring any third-party services you enable are covered by proper agreements and data
                                processing protections.
                            </li>
                        </ul>
                    </section>

                    <footer className="mt-6 border-t pt-4 text-sm text-slate-600">
                        <p><strong>Contact (Hosted):</strong> routeshaper[at]gmail[dot]com</p>
                        <p className="mt-2">Last updated: <time dateTime="2025-09-07">September 7, 2025</time></p>
                    </footer>
                </article>
            </main>
        </div>
    );
};


export default Tos;