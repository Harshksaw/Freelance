import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/database/mongodb';
import Deal from '../../../lib/database/models/deal';
import { dealFormSchema } from '../../../lib/validations/deal-schema';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    console.log('🔧 Database connected successfully');

    const body = await request.json();
    console.log('🔧 Raw request body:', JSON.stringify(body, null, 2));
    
    // Validate the request body with Zod
    let validatedData;
    try {
      validatedData = dealFormSchema.parse(body);
      console.log('🔧 Zod validation passed:', JSON.stringify(validatedData, null, 2));
    } catch (zodError) {
      console.error('🔧 Zod validation failed:', zodError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error', 

        },
        { status: 400 }
      );
    }

    // Create new deal
    console.log('🔧 Creating deal with data:', validatedData);
    
    try {
      const deal = new Deal(validatedData);
      console.log('🔧 Deal instance created, validating...');
      
      // Validate before saving
      await deal.validate();
      console.log('🔧 Mongoose validation passed');
      
      // Save to database
      await deal.save();
      console.log('🔧 Deal saved successfully:', deal._id);

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

    } catch (mongooseError) {
      console.error('🔧 Mongoose error details:', mongooseError);
      console.error('🔧 Mongoose error name:', mongooseError.name);
      console.error('🔧 Mongoose error message:', mongooseError.message);
      
      if (mongooseError.name === 'ValidationError') {
        console.error('🔧 Validation errors:', mongooseError.errors);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Database validation error',
            details: Object.keys(mongooseError.errors).map(key => ({
              field: key,
              message: mongooseError.errors[key].message
            }))
          },
          { status: 400 }
        );
      }
      
      throw mongooseError; // Re-throw non-validation errors
    }

  } catch (error) {
    console.error('🔧 General error:', error);
    console.error('🔧 Error stack:', error.stack);

    // Zod validation error
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // MongoDB/Mongoose error
    if (error?.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: 'Database validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create deal', details: error.message },
      { status: 500 }
    );
  }
}

// Keep the existing GET method unchanged
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