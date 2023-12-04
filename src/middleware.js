import { NextResponse } from "next/server";
import { getIsProvider } from "@/utils/cookies"; 

function middleware(request) {
	if (request.nextUrl.pathname.endsWith("/")) {
		return NextResponse.rewrite(new URL("/main", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		if (!getIsProvider()) {
			return NextResponse.redirect(new URL("/main", request.url));
		}
	}

	return NextResponse.next();
}

export default middleware;
