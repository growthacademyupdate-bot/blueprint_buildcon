import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includePending = searchParams.get('all') === 'true';
    
    await connectToDatabase();
    const query = includePending ? {} : { status: { $in: ['approved', 'pending'] } };
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { fullname, email, feedback, rating } = await req.json();
    await connectToDatabase();
    const testimonial = await Testimonial.create({ fullname, email, feedback, rating });
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}
