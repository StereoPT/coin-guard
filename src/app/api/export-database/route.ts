import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse("Token required", { status: 400 });
    }

    const tokenPath = `/tmp/token_${token}.json`;
    if (!fs.existsSync(tokenPath)) {
      return new NextResponse("Invalid or expired token", { status: 404 });
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

    if (Date.now() - tokenData.timestamp > 10 * 60 * 1000) {
      fs.unlinkSync(tokenPath);
      if (fs.existsSync(tokenData.filePath)) {
        fs.unlinkSync(tokenData.filePath);
      }

      return new NextResponse("Token expired", { status: 410 });
    }

    const fileBuffer = fs.readFileSync(tokenData.filePath);

    fs.unlinkSync(tokenPath);
    fs.unlinkSync(tokenData.filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": tokenData.contentType,
        "Content-Disposition": `attachment; filename="${tokenData.filename}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Download failed", { status: 500 });
  }
}
