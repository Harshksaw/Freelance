import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/database/mongodb';
import Deal from '../../../lib/database/models/deal';
import { dealFormSchema } from '../../../lib/validation/deal-schema';


export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate the request body
    const validatedData = dealFormSchema.parse(body);

    // Create new deal
    const deal = new Deal(validatedData);
    await deal.save();

    return NextResponse.json({
      success: true,
      deal: {
        id: deal._id,
        companyName: deal.companyName,
        companyNumber: deal.companyNumber,
        businessTurnover: deal.businessTurnover,
        fundingType: deal.fundingType,
        purpose: deal.purpose,
        loanAmount: deal.loanAmount,
        notes: deal.notes,
        createdAt: deal.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Deal creation error:', error);

    // Validation error
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error },
        { status: 400 }
      );
    }

    // MongoDB error
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: 'Database validation error' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create deal' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    let query = {};
    if (search) {
      query = {
        $or: [
          { companyName: { $regex: search, $options: 'i' } },
          { purpose: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Get total count for pagination
    const total = await Deal.countDocuments(query);

    // Get deals with pagination and sorting
    const deals = await Deal.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      deals: deals.map(deal => ({
        id: deal._id,
        companyName: deal.companyName,
        companyNumber: deal.companyNumber,
        businessTurnover: deal.businessTurnover,
        fundingType: deal.fundingType,
        purpose: deal.purpose,
        loanAmount: deal.loanAmount,
        notes: deal.notes,
        createdAt: deal.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get deals error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}