import mongoose, { InferSchemaType } from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    projectType: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, trim: true, default: '', maxlength: 200 },
    budget: { type: String, trim: true, default: '', maxlength: 100 },
    startDate: { type: String, trim: true, default: '' },
  },
  { timestamps: true, collection: 'consultations' },
);

export type ConsultationDocument = InferSchemaType<typeof consultationSchema>;

export const Consultation =
  mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);