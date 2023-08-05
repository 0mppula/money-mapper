import { getAuthSession } from '@/app/actions/auth';
import db from '@/lib/db';
import { creationSchema } from '@/schemas/financialRecord';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const GET = async (req: Request) => {
	try {
		const session = await getServerSession();

		if (!session) {
			return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
		}

		const financialRecords = await db.financialRecord.findMany({
			where: { userId: session?.user.id },
		});

		return NextResponse.json({ data: financialRecords });
	} catch (error) {
		NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
	}
};

export const POST = async (req: Request) => {
	try {
		const body = await req.json();
		const session = await getAuthSession();

		console.log(session);

		if (!session) return NextResponse.error();

		const { assetsExCash, cash, currency, debt, grossIncomeYtd, taxesPaidYtd, date } =
			creationSchema.parse(body);

		const financialRecord = await db.financialRecord.create({
			data: {
				assetsExCash,
				cash,
				currency,
				date,
				debt,
				grossIncomeYtd,
				taxesPaidYtd,
				userId: session?.user.id,
			},
		});

		return NextResponse.json({ data: financialRecord });
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 });
		}

		NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
	}
};
