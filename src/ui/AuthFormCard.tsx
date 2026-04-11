import { Card, CardContent } from '@mui/material';
import type { ReactNode } from 'react';
import { authFormCardPaddingSx } from './productCardPadding';

type Props = {
  children: ReactNode;
};

/** Login / register: one card shell so padding and width stay aligned across auth flows. */
export function AuthFormCard({ children }: Props) {
  return (
    <Card className="nx-product-surface" variant="outlined" sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
      <CardContent sx={{ ...authFormCardPaddingSx, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {children}
      </CardContent>
    </Card>
  );
}
