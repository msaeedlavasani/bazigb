'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
  Button,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { getAdminStats, getAdminUsers, AdminStats, AdminUser } from '@/lib/admin';
import Nav from '../components/Nav';
import { Users, PlayCircle, Trophy, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const take = 50;

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      const timer = setTimeout(() => {
        loadData();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [user, search, roleFilter, page]);

  async function loadData() {
    setLoading(true);
    try {
      const [s, u] = await Promise.all([
        getAdminStats(),
        getAdminUsers({
          q: search,
          role: roleFilter === 'ALL' ? undefined : roleFilter,
          take,
          skip: page * take,
        }),
      ]);
      setStats(s);
      setUsers(u.items);
      setTotalUsers(u.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || (user && user.role !== 'ADMIN' && !authLoading)) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: '#0f172a' }}>
        {authLoading ? <CircularProgress /> : <Typography color="white">دسترسی محدود</Typography>}
      </Box>
    );
  }

  if (!user) return null;

  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          bgcolor: '#0f172a',
          color: 'white',
          direction: 'rtl',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 'lg', display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#818cf8' }}>
              پنل مدیریت
            </Typography>
            <Button
              component={Link}
              href="/lobby"
              startIcon={<ArrowLeft size={20} />}
              sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}
            >
              بازگشت به لابی
            </Button>
          </Box>

          {/* Stats */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#1e293b', 0.6), border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Users color="#818cf8" size={24} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>کل کاربران</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>{stats?.users.total || 0}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{stats?.users.admins || 0} مدیر</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#1e293b', 0.6), border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <PlayCircle color="#10b981" size={24} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>اتاق‌های فعال</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>{stats?.rooms.playing || 0}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{stats?.rooms.waiting || 0} در انتظار</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#1e293b', 0.6), border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Trophy color="#f59e0b" size={24} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>بازی‌های انجام شده</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>{stats?.games.total || 0}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>در تمامی سبک‌ها</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Users Table */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: alpha('#1e293b', 0.6), border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3, alignItems: 'center' }}>
              <TextField
                placeholder="جستجو (نام کاربری، ایمیل، موبایل)..."
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#0f172a',
                    color: 'white',
                  },
                }}
              />
              <ToggleButtonGroup
                value={roleFilter}
                exclusive
                onChange={(_, val) => val && setRoleFilter(val)}
                size="small"
                sx={{ bgcolor: '#0f172a', borderRadius: 3 }}
              >
                <ToggleButton value="ALL" sx={{ color: 'white', px: 2 }}>همه</ToggleButton>
                <ToggleButton value="USER" sx={{ color: 'white', px: 2 }}>کاربر</ToggleButton>
                <ToggleButton value="ADMIN" sx={{ color: 'white', px: 2 }}>مدیر</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>نام کاربری</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>ایمیل / موبایل</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>نقش</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>برد / باخت</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>رتبه</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 700, textAlign: 'right' }}>تاریخ عضویت</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography sx={{ color: 'text.disabled' }}>کاربری یافت نشد</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((u) => (
                      <TableRow key={u.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600, textAlign: 'right' }}>{u.username}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', textAlign: 'right' }}>
                          {u.email || u.phone || '-'}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Box
                            component="span"
                            sx={{
                              px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 700,
                              bgcolor: u.role === 'ADMIN' ? alpha('#f43f5e', 0.1) : alpha('#38bdf8', 0.1),
                              color: u.role === 'ADMIN' ? '#fb7185' : '#7dd3fc',
                            }}
                          >
                            {u.role === 'ADMIN' ? 'مدیر' : 'کاربر'}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'right' }}>{u.wins} / {u.losses}</TableCell>
                        <TableCell sx={{ color: '#fbbf24', fontWeight: 700, textAlign: 'right' }}>{u.rating}</TableCell>
                        <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem', textAlign: 'right' }}>
                          {new Date(u.createdAt).toLocaleDateString('fa-IR')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, direction: 'ltr' }}>
              <Button
                disabled={page === 0 || loading}
                onClick={() => setPage(p => p - 1)}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Previous
              </Button>
              <Typography sx={{ alignSelf: 'center', color: 'text.secondary' }}>
                Page {page + 1}
              </Typography>
              <Button
                disabled={users.length < take || loading}
                onClick={() => setPage(p => p + 1)}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
