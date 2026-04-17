'use client';

import { Section } from '@/components/ui/Section';
import { SOCIAL_LINKS, PROFILE } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';

export function ContactsSection() {
  return (
    <Section id="contacts" title="Контакты" subtitle="Свяжитесь со мной">
      <div className="section-card-contacts p-8 md:p-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <FadeIn>
          <div className="space-y-6">
            <p className="text-lg text-foreground/80">
              Открыт для предложений и сотрудничества. Напишите мне!
            </p>

            {/* Direct Contacts */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Или напрямую:</h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => {
                  // Если это email, используем PROFILE.email
                  const url = link.icon === 'email'
                    ? `mailto:${PROFILE.email}`
                    : link.url;

                  const IconComponent =
                    link.icon === 'github'
                      ? () => (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      : link.icon === 'telegram'
                      ? () => (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                          </svg>
                        )
                      : link.icon === 'vk'
                      ? () => (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.073 2H8.937C5.006 2 2 5.006 2 8.927v6.137C2 18.994 5.006 22 8.937 22h6.137C18.994 22 22 18.994 22 15.063V8.927C22 5.006 18.994 2 15.073 2zM17.98 13.543c.325.314.64.595.82.628 0 0 .607.065.965 0 0 0 .508-.162.529.415.01.184.01.357.01.53 0 0 .011.404-.173.617-.194.227-.573.238-.573.238H18.23s-.405.043-.784-.152c-.405-.205-.795-.66-1.78-1.59-.909-.843-1.277-.985-1.504-.93-.346.075-.227.426-.227 1.298 0 .281.043.54-.097.649-.47.367-1.736.346-1.736.346s-3.726.054-5.262-.854c-.843-.492-1.483-1.309-1.483-1.309s-.151-.184-.108-.368c.054-.173.357-.249.357-.249l1.287-.01s.27.043.46-.087c.173-.119.238-.335.238-.335s.043-.238-.108-.449c-.206-.292-.595-.751-.595-.751s-.313-.379-.649-.8c-.357-.449-.762-.8-1.076-.897-.303-.097-.39-.065-.595-.065-.206 0-.54.054-.54.054s-.281.011-.389.13c-.108.119-.011.346-.011.346s1.13 2.65 2.406 3.992C7.916 14.746 10.296 15 12.25 15c1.043 0 1.222-.292 1.222-.8 0-2.406-.346-2.607 1.01-2.763.438-.054.752-.011 1.033.303.335.378.324 1.26 1.465 1.801z" />
                          </svg>
                        )
                      : () => (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        );

                  return (
                    <a
                      key={link.name}
                      href={url}
                      target={link.icon === 'email' ? undefined : '_blank'}
                      rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <IconComponent />
                      </div>
                      <span className="font-medium">
                        {link.icon === 'email' ? PROFILE.email : link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      </div>
    </Section>
  );
}
