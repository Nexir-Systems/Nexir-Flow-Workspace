import { Card, CardContent, CardHeader, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  subheader?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function SectionCard({ title, subheader, children, sx }: Props) {
  return (
    <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden', ...sx }}>
      {title ? <CardHeader title={title} subheader={subheader} /> : null}
      <CardContent sx={{ pt: title ? 0 : 2.5 }}>{children}</CardContent>
    </Card>
  );
}
