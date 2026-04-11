import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export type RouteMapRow = { path: string; note: string; kind: 'public' | 'auth' | 'entity' };

const SEGMENTS: { kind: RouteMapRow['kind']; label: string }[] = [
  { kind: 'public', label: 'Public' },
  { kind: 'auth', label: 'App shell' },
  { kind: 'entity', label: 'Entity flows' },
];

function segmentAccent(t: Theme, kind: RouteMapRow['kind']) {
  switch (kind) {
    case 'public':
      return t.palette.success.main;
    case 'auth':
      return t.palette.primary.main;
    case 'entity':
      return t.palette.warning.main;
    default:
      return t.palette.primary.main;
  }
}

type Props = {
  routes: RouteMapRow[];
};

/**
 * One outlined surface: routes grouped by kind with a shared left accent and dividers between groups.
 */
export function RouteMapSegmented({ routes }: Props) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {SEGMENTS.map((seg, segIdx) => {
        const rows = routes.filter((r) => r.kind === seg.kind);
        if (rows.length === 0) return null;
        const prevSegmentRendered = SEGMENTS.slice(0, segIdx).some((s) =>
          routes.some((r) => r.kind === s.kind),
        );
        return (
          <Box key={seg.kind}>
            {prevSegmentRendered ? <Divider /> : null}
            <Box
              sx={(t) => {
                const a = segmentAccent(t, seg.kind);
                return {
                  borderLeft: 4,
                  borderLeftStyle: 'solid',
                  borderLeftColor: a,
                  bgcolor: alpha(a, t.palette.mode === 'dark' ? 0.08 : 0.05),
                  px: 2,
                  py: 1.75,
                };
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 1.25 }}
              >
                {seg.label}
              </Typography>
              <Stack spacing={1.25} divider={<Divider flexItem sx={{ borderColor: 'divider', opacity: 0.85 }} />}>
                {rows.map((r) => (
                  <SegmentedRouteRow key={r.path} row={r} />
                ))}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}

function SegmentedRouteRow({ row }: { row: RouteMapRow }) {
  return (
    <Box>
      <Typography
        variant="body2"
        component="code"
        sx={(t) => ({
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.875rem',
          fontWeight: 700,
          color: segmentAccent(t, row.kind),
          wordBreak: 'break-all',
          lineHeight: 1.45,
          display: 'block',
        })}
      >
        {row.path}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.65, lineHeight: 1.55, fontSize: '0.875rem' }}>
        {row.note}
      </Typography>
    </Box>
  );
}
