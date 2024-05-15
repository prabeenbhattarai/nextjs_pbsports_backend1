import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { getServerSession } from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['official.pbsports@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return null; // Return null to invalidate session for non-admins
      }
    },
  },
  session: {
    // Customize session expiration here
    maxAge: 24 * 60 * 60, // 1 day in seconds
    updateAge: 12 * 60 * 60, // 12 hours in seconds
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !adminEmails.includes(session.user.email)) {
    res.status(401).end();
    throw new Error('NOT ADMIN');
  }
}
