'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones,
  Calendar,
  Shield,
  Upload,
  ChevronRight,
  ChevronLeft,
  FileText,
  AlertCircle,
} from 'lucide-react';

const DEFAULT_CONTACT = {
  badge: 'Book Appointment',
  mainTitle: 'Schedule Your',
  mainTitleHighlight: 'Healthcare Visit',
  mainDescription:
    'Book your appointment with MediCare Plus Family Clinic. We offer both in-person and telemedicine consultations to meet your healthcare needs.',
  formTitle: 'Book Your Appointment',
  formDescription:
    'Complete our secure appointment booking form. All information is HIPAA compliant and protected.',
  submitButton: 'Confirm Appointment',
  contactSectionTitle: 'Contact Our Clinic',
  method1Title: 'Emergency Line',
  method1Description: '24/7 emergency support',
  method1Contact: '+1 (555) 911-CARE',
  method2Title: 'Appointments',
  method2Description: 'Schedule your visit',
  method2Contact: '+1 (555) 123-DOCS',
  method3Title: 'Patient Portal',
  method3Description: 'Access your records',
  method3Contact: 'Available 24/7',
  officesSectionTitle: 'Clinic Locations',
  office1City: 'Main Clinic',
  office1Address: '123 Health Plaza, Suite 200',
  office1Timezone: 'Mon-Fri 8AM-6PM',
  office2City: 'Pediatric Center',
  office2Address: '456 Family Way, Building B',
  office2Timezone: 'Mon-Sat 9AM-5PM',
  office3City: "Women's Health",
  office3Address: '789 Wellness Drive, Floor 3',
  office3Timezone: 'Mon-Fri 8AM-7PM',
  hoursTitle: 'Clinic Hours',
  hoursWeekdayLabel: 'Monday - Friday',
  hoursWeekdayTime: '8:00 AM - 6:00 PM',
  hoursSaturdayLabel: 'Saturday',
  hoursSaturdayTime: '9:00 AM - 2:00 PM',
  hoursSundayLabel: 'Sunday',
  hoursSundayTime: 'Emergency Only',
  supportNote: '24/7 emergency care available for all patients',
  nameLabel: 'Full Name *',
  namePlaceholder: 'John Doe',
  emailLabel: 'Email Address *',
  emailPlaceholder: 'john@email.com',
  companyLabel: 'Phone Number *',
  companyPlaceholder: '(555) 123-4567',
  messageLabel: 'Additional Notes',
  messagePlaceholder: 'Any specific concerns or questions for your appointment...',
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    patientType: '',
    // Step 2
    appointmentType: '',
    // Step 3
    preferredDate: '',
    preferredTime: '',
    // Step 4
    insuranceProvider: '',
    policyNumber: '',
    // Step 5
    symptoms: [] as string[],
    // Contact info
    name: '',
    email: '',
    phone: '',
    notes: '',
    // File upload
    medicalRecords: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptom] : prev.symptoms.filter(s => s !== symptom),
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, medicalRecords: file }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const contactMethods = [
    {
      icon: Phone,
      title: config.method1Title,
      description: config.method1Description,
      contact: config.method1Contact,
    },
    {
      icon: Calendar,
      title: config.method2Title,
      description: config.method2Description,
      contact: config.method2Contact,
    },
    {
      icon: MessageSquare,
      title: config.method3Title,
      description: config.method3Description,
      contact: config.method3Contact,
    },
  ];

  const offices = [
    {
      city: config.office1City,
      address: config.office1Address,
      timezone: config.office1Timezone,
    },
    {
      city: config.office2City,
      address: config.office2Address,
      timezone: config.office2Timezone,
    },
    {
      city: config.office3City,
      address: config.office3Address,
      timezone: config.office3Timezone,
    },
  ];

  const appointmentTypes = [
    'General Consultation',
    'Follow-up Visit',
    'Annual Physical',
    'Vaccination',
    'Pediatric Checkup',
    "Women's Health",
    'Mental Health Consultation',
  ];

  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna',
    'UnitedHealthcare',
    'Medicare',
    'Medicaid',
    'Humana',
    'Kaiser Permanente',
    'Self-Pay',
  ];

  const commonSymptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Nausea',
    'Chest Pain',
    'Shortness of Breath',
    'Joint Pain',
    'Skin Issues',
    'Sleep Problems',
  ];

  const timeSlots = [
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Patient Type</h3>
            <div className="space-y-3">
              {['New Patient', 'Existing Patient'].map(type => (
                <label
                  key={type}
                  className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="radio"
                    name="patientType"
                    value={type}
                    checked={formData.patientType === type}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appointment Type</h3>
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select appointment type...</option>
              {appointmentTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferred Date & Time</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select time...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Insurance Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Insurance Provider</label>
                <select
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select insurance provider...</option>
                  {insuranceProviders.map(provider => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Policy Number (Optional)</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="Enter your policy number"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Symptoms (Optional)</h3>
              <div className="grid grid-cols-2 gap-3">
                {commonSymptoms.map(symptom => (
                  <label
                    key={symptom}
                    className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.symptoms.includes(symptom)}
                      onChange={e => handleSymptomChange(symptom, e.target.checked)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <span data-editable="nameLabel">{config.nameLabel}</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={config.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <span data-editable="emailLabel">{config.emailLabel}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder={config.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  <span data-editable="companyLabel">{config.companyLabel}</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder={config.companyPlaceholder}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  <span data-editable="messageLabel">{config.messageLabel}</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder={config.messagePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Medical Records (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {formData.medicalRecords
                        ? formData.medicalRecords.name
                        : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG, DOC up to 10MB
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-muted/20 to-background"
      data-editable="contact"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Multi-Step Appointment Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="size-6 text-primary" />
                <span data-editable="formTitle">{config.formTitle}</span>
              </CardTitle>
              <CardDescription>
                <span data-editable="formDescription">{config.formDescription}</span>
              </CardDescription>

              {/* Progress Indicator */}
              <div className="flex items-center justify-between mt-4">
                {[1, 2, 3, 4, 5].map(step => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 5 && (
                      <div
                        className={`w-8 h-0.5 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>

                  {currentStep < 5 ? (
                    <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                      Next
                      <ChevronRight className="size-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex items-center gap-2 group">
                      <span data-editable="submitButton">{config.submitButton}</span>
                      <Send className="size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </form>

              {/* HIPAA Compliance Notice */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">HIPAA Compliance</h4>
                    <p className="text-sm text-primary/80">
                      Your health information is protected under HIPAA regulations. All data
                      transmitted through this form is encrypted and secure. We will never share
                      your personal health information without your explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Emergency & Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Headphones className="size-5 text-primary" />
                <span data-editable="contactSectionTitle">{config.contactSectionTitle}</span>
              </h3>
              <div className="grid gap-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <Card
                      key={index}
                      className={`border-border/50 hover:border-primary/20 transition-colors cursor-pointer group ${
                        index === 0 ? 'border-red-200 bg-red-50/50' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`size-12 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors ${
                              index === 0 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'
                            }`}
                          >
                            <Icon className="size-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 flex items-center gap-2">
                              <span data-editable={`method${index + 1}Title`}>{method.title}</span>
                              {index === 0 && <AlertCircle className="size-4 text-red-500" />}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              <span data-editable={`method${index + 1}Description`}>
                                {method.description}
                              </span>
                            </p>
                            <p
                              className={`font-medium ${index === 0 ? 'text-red-600' : 'text-primary'}`}
                            >
                              <span data-editable={`method${index + 1}Contact`}>
                                {method.contact}
                              </span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Clinic Locations */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <span data-editable="officesSectionTitle">{config.officesSectionTitle}</span>
              </h3>
              <div className="space-y-3">
                {offices.map((office, index) => (
                  <div key={index} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">
                          <span data-editable={`office${index + 1}City`}>{office.city}</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span data-editable={`office${index + 1}Address`}>{office.address}</span>
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <span data-editable={`office${index + 1}Timezone`}>{office.timezone}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Hours */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Clock className="size-5 text-primary" />
                  <span data-editable="hoursTitle">{config.hoursTitle}</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      <span data-editable="hoursWeekdayLabel">{config.hoursWeekdayLabel}</span>
                    </span>
                    <span data-editable="hoursWeekdayTime">{config.hoursWeekdayTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      <span data-editable="hoursSaturdayLabel">{config.hoursSaturdayLabel}</span>
                    </span>
                    <span data-editable="hoursSaturdayTime">{config.hoursSaturdayTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      <span data-editable="hoursSundayLabel">{config.hoursSundayLabel}</span>
                    </span>
                    <span className="text-muted-foreground">
                      <span data-editable="hoursSundayTime">{config.hoursSundayTime}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary font-medium flex items-center gap-2">
                    <Users className="size-4" />
                    <span data-editable="supportNote">{config.supportNote}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
