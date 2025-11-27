import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: 'student' | 'employer';
    profileId: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: 'student' | 'employer';
      profileId: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'student' | 'employer';
    profileId: string;
  }
}
