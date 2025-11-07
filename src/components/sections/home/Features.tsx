'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Baby,
  Users,
  Brain,
  Clock,
  Calendar,
  Phone,
  Shield,
  Stethoscope,
} from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  badge: 'Our Medical Services',
  mainTitle: 'Comprehensive Healthcare',
  mainTitleHighlight: 'For Your Entire Family',
  mainDescription:
    "From routine check-ups to specialized care, we provide comprehensive medical services with both in-person and telemedicine options to meet your family's healthcare needs.",
  feature1Title: 'Primary Care',
  feature1Description:
    'Complete primary care services including annual physicals, preventive care, chronic disease management, and routine health screenings.',
  feature1Badge: 'General Medicine',
  feature2Title: 'Pediatrics',
  feature2Description:
    'Specialized care for infants, children, and adolescents including well-child visits, immunizations, and developmental assessments.',
  feature2Badge: 'Child Care',
  feature3Title: "Women's Health",
  feature3Description:
    "Comprehensive women's healthcare including annual exams, family planning, prenatal care, and menopause management.",
  feature3Badge: "Women's Care",
  feature4Title: 'Mental Health',
  feature4Description:
    'Mental health services including counseling, therapy, anxiety and depression treatment, and stress management support.',
  feature4Badge: 'Mental Wellness',
  ctaQuestion: 'Ready to schedule your appointment?',
  primaryCTA: 'Book Now',
  primaryCTAHref: '/appointment',
  secondaryCTA: 'Call Us',
  secondaryCTAHref: 'tel:+1-555-MEDICAL',
  operatingHours: [
    { department: 'Primary Care', hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM' },
    { department: 'Pediatrics', hours: 'Mon-Fri: 9:00 AM - 5:00 PM, Sat: 10:00 AM - 1:00 PM' },
    { department: "Women's Health", hours: 'Mon-Thu: 8:00 AM - 5:00 PM, Fri: 8:00 AM - 3:00 PM' },
    { department: 'Mental Health', hours: 'Mon-Fri: 10:00 AM - 7:00 PM, Sat: 9:00 AM - 1:00 PM' },
    { department: 'Telemedicine', hours: 'Mon-Sun: 7:00 AM - 9:00 PM' },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const features = [
    {
      icon: Heart,
      title: config.feature1Title,
      description: config.feature1Description,
      badge: config.feature1Badge,
    },
    {
      icon: Baby,
      title: config.feature2Title,
      description: config.feature2Description,
      badge: config.feature2Badge,
    },
    {
      icon: Users,
      title: config.feature3Title,
      description: config.feature3Description,
      badge: config.feature3Badge,
    },
    {
      icon: Brain,
      title: config.feature4Title,
      description: config.feature4Description,
      badge: config.feature4Badge,
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-background to-muted/20"
      data-editable="features"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <CardHeader className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <span data-editable={`feature${index + 1}Badge`}>{feature.badge}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    <span data-editable={`feature${index + 1}Title`}>{feature.title}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed mb-4">
                    <span data-editable={`feature${index + 1}Description`}>
                      {feature.description}
                    </span>
                  </CardDescription>

                  <Button className="w-full" onClick={() => navigate('/appointment')}>
                    <Calendar className="mr-2 size-4" />
                    Book Now
                  </Button>
                </CardContent>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Operating Hours Table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <Clock className="size-6 text-primary" />
              Department Operating Hours
            </h3>
            <p className="text-muted-foreground">
              Find the right time to visit based on your healthcare needs
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Department</th>
                      <th className="text-left p-4 font-semibold">Operating Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.operatingHours.map((dept, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 font-medium flex items-center gap-2">
                          <Stethoscope className="size-4 text-primary" />
                          {dept.department}
                        </td>
                        <td className="p-4 text-muted-foreground">{dept.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            <span data-editable="ctaQuestion">{config.ctaQuestion}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-6 py-3"
              onClick={() => navigate(config.primaryCTAHref)}
              data-editable-href="primaryCTAHref"
              data-href={config.primaryCTAHref}
            >
              <Calendar className="mr-2 size-4" />
              <span data-editable="primaryCTA">{config.primaryCTA}</span>
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3"
              onClick={() => navigate(config.secondaryCTAHref)}
              data-editable-href="secondaryCTAHref"
              data-href={config.secondaryCTAHref}
            >
              <Phone className="mr-2 size-4" />
              <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
