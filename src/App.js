import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import Signup from './pages/signup';
import ProfileSetup from './pages/profile-setup';
import Login from './pages/login';
import Home from './pages/home';
import WriteChapter1 from './pages/write-chapter1';
import WriteChapter2 from './pages/write-chapter2';
import WriteChapter3 from './pages/write-chapter3';
import Feedback from './pages/feedback';
import Mypage from './pages/mypage';
import Archivepage from './pages/archivepage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 기본 경로 - 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes - 로그인 안 한 사용자만 접근 가능 */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />
        
        {/* ProfileSetup은 회원가입 직후에만 접근 (특별 케이스) */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* Protected Routes - 로그인 필수 */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/write-chapter1" 
          element={
            <ProtectedRoute>
              <WriteChapter1 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/write-chapter2" 
          element={
            <ProtectedRoute>
              <WriteChapter2 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/write-chapter3" 
          element={
            <ProtectedRoute>
              <WriteChapter3 />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mypage" 
          element={
            <ProtectedRoute>
              <Mypage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/archive" 
          element={
            <ProtectedRoute>
              <Archivepage />
            </ProtectedRoute>
          } 
        />

        {/* 404 - 존재하지 않는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;