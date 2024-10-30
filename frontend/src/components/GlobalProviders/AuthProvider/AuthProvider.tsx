import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { APIError, useError } from "../ErrorProvider";
import { useLocalStorage } from "../LocalStorageProvider";
import { useGoogleLogin } from "@react-oauth/google";

import {
  GoogleUser,
  GoogleUserGetRequest,
  GoogleUserGetResponse,
  User,
  UserGetRequest,
  UserGetResponse,
  UserPostRequest,
  UserPostResponse,
} from "./types";
import { get, post } from "@frontend-ui/utils/apiUtils";

// Define a type for the context value
interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserById: (userId: string) => Promise<User | null>;
  createUser: (userData: User) => Promise<UserPostResponse>;
  googleLogin: () => void;
  handleSkipLogin: (response: any) => Promise<void>;
  handleLogin: (response: any) => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  user: null,
  login: async () => {
    throw new Error("login function not in context.");
  },
  logout: async () => {
    throw new Error("logout function not in context.");
  },
  getUserById: async () => {
    throw new Error("getUserById function not in context.");
  },
  createUser: async () => {
    throw new Error("createUser function not in context.");
  },
  googleLogin: () => {
    throw new Error("googleLogin function not in context.");
  },
  handleSkipLogin: async () => {
    throw new Error("handleSkipLogin function not in context.");
  },
  handleLogin: async () => {
    throw new Error("handleLogin function not in context.");
  },
});

export const useAuth = (): AuthContext => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { setItem, getItem } = useLocalStorage();
  const { setError } = useError(); // Use generic type for User

  const login = async () => {
    setIsAuthenticated(true);
    setItem("isAuthenticated", "true");
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setItem("accessToken", "null");
    setItem("isAuthenticated", "false");
  };

  const getUserById = async (userId: string): Promise<User | null> => {
    const userRequest: UserGetRequest = {
      url: `${import.meta.env.VITE_AUTH_SERVICE_API_BASE_URL}/api/users/${userId}`,
    };
    const userResp = await get<UserGetRequest, UserGetResponse>(userRequest);
    return userResp?.data || null;
  };

  const createUser = async (userData: User): Promise<UserPostResponse> => {
    const request: UserPostRequest = {
      url: `${import.meta.env.VITE_AUTH_SERVICE_API_BASE_URL}/api/users`,
      data: userData,
    };
    const response: UserPostResponse = await post<
      UserPostRequest,
      UserPostResponse
    >(request);
    return response;
  };

  const refreshUserSession = async () => {
    const storedAccessToken = getItem("accessToken");

    if (storedAccessToken !== '"null"') {
      try {
        const userRequest = {
          url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${storedAccessToken}`,
          options: {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
              Accept: "application/json",
            },
          },
        };
        const googleUserResp = await get<
          GoogleUserGetRequest,
          GoogleUserGetResponse
        >(userRequest);

        if (googleUserResp.data) {
          const personInfo = {
            email: googleUserResp.data.email,
            name: googleUserResp.data.name,
            imageUrl: googleUserResp.data.picture,
            userId: googleUserResp.data.id,
          };

          await processLogin(personInfo);
        }
      } catch (err) {
        setAccessToken(null);
        setItem("accessToken", "null");
      }
    }
  };

  useEffect(() => {
    const isAuthenticatedStored = getItem("isAuthenticated") === "true";
    if (!user && !accessToken && isAuthenticatedStored) {
      refreshUserSession();
    } else {
      setItem("isAuthenticated", "false");
    }
  }, [getItem]);

  const processLogin = async (personInfo: any) => {
    let user = null;
    try {
      user = await getUserById(personInfo.userId);

      if (!user) {
        const createUserResp = await createUser(personInfo);
        user = await getUserById(createUserResp.data.userId);
      }

      login();
    } finally {
      if (user && user) {
        setUser(user);
      }
    }
  };

  const handleSkipLogin = async () => {
    setItem("accessToken", "blabla");
    setAccessToken("blabla");

    const googleUser = {
      id: "106433914132318818488",
      email: "mark19960630@gmail.com",
      verified_email: true,
      name: "Mark Zhu",
      given_name: "Mark",
      family_name: "Zhu",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocL1CnsdsiZGRl0mnNSV7NzhsU3aELVfi44QXRY3DgLLYfjF=s96-c",
      locale: "en",
    };
    if (googleUser) {
      const personInfo = {
        email: googleUser.email,
        name: googleUser.name,
        imageUrl: googleUser.picture,
        accessToken: "blabla",
        userId: googleUser.id,
      };

      await processLogin(personInfo);
    }
  };

  const handleLogin = async (response: any) => {
    setItem("accessToken", response.access_token);
    setAccessToken(response.access_token);

    const userRequest = {
      url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
      options: {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          Accept: "application/json",
        },
      },
    };
    const googleUserResp = await get<
      GoogleUserGetRequest,
      GoogleUserGetResponse
    >(userRequest);

    const googleUser: GoogleUser = googleUserResp?.data;
    if (googleUser) {
      const personInfo = {
        email: googleUser.email,
        name: googleUser.name,
        imageUrl: googleUser.picture,
        accessToken: response.access_token,
        userId: googleUser.id,
      };

      await processLogin(personInfo);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLogin,
    onError: (errorResponse) => {
      const error: APIError = {
        message:
          errorResponse.error_description || "An error occurred during login",
        code: errorResponse.error ? parseInt(errorResponse.error, 10) : 520,
      };
      setError(error); // Pass the mapped APIError
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        getUserById,
        createUser,
        googleLogin,
        handleSkipLogin,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
