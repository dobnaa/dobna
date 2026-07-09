import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;