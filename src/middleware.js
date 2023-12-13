import { NextResponse } from "next/server";

function middleware(request) {
	if (request.nextUrl.pathname.endsWith("/")) {
		return NextResponse.rewrite(new URL("/main", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/main/records")) {
		const accessToken = request.cookies.get("accessToken")?.value;
		if (!accessToken) {
			return NextResponse.redirect(new URL("/main", request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		const isProvider = request.cookies.get("isProvider")?.value;
		if (isProvider!=="true") {
			return NextResponse.redirect(new URL("/main", request.url));
		}
	}

	return NextResponse.next();
}

export default middleware;
