import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Consultation } from '@/models/Consultation';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requiredFields = ['name', 'phone', 'email', 'city', 'projectType'] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const consultation = {
      name: typeof body.name === 'string' ? body.name.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : '',
      city: typeof body.city === 'string' ? body.city.trim() : '',
      projectType: typeof body.projectType === 'string' ? body.projectType.trim() : '',
      location: typeof body.location === 'string' ? body.location.trim() : '',
      budget: typeof body.budget === 'string' ? body.budget.trim() : '',
      startDate: typeof body.startDate === 'string' ? body.startDate.trim() : '',
    };

    const missingField = requiredFields.find((field) => !consultation[field]);
    if (missingField) {
      return NextResponse.json({ error: `${missingField} is required` }, { status: 400 });
    }

    if (!emailPattern.test(consultation.email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    await connectToDatabase();
    await Consultation.create(consultation);

    return NextResponse.json({ message: 'Consultation saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Consultation form submission failed:', error);
    return NextResponse.json({ error: 'Unable to save your consultation right now' }, { status: 500 });
  }
}