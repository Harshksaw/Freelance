import { NextResponse } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import Deal from '@/lib/database/models/deal';

export async function GET() {
  try {
    await connectDB();
    
    // Try to count documents (this will work even with empty collection)
    const count = await Deal.countDocuments();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      dealCount: count 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
} 