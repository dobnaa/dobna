// hooks/useChallenge.js

import { useState, useEffect, useCallback } from 'react';
import { challengeService } from '../services/challengeService';
import { useAuth } from './useAuth';

export const useChallenge = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [unlockedLevels, setUnlockedLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // دریافت چالش‌های فعال
  const fetchActiveChallenges = useCallback(async () => {
    try {
      const data = await challengeService.getActiveChallenges();
      setActiveChallenges(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // دریافت چالش‌های کاربر
  const fetchUserChallenges = useCallback(async () => {
    if (!user) return;
    try {
      const data = await challengeService.getChallengeTransactions(user.id);
      setUserChallenges(data);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);

  // دریافت سطوح آزاد شده
  const fetchUnlockedLevels = useCallback(async () => {
    if (!user) return;
    try {
      const levels = await challengeService.getUnlockedLevels(user.id);
      setUnlockedLevels(levels);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);

  // ایجاد چالش جدید
  const createChallenge = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await challengeService.createChallenge(data);
      await fetchActiveChallenges();
      await fetchUserChallenges();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchActiveChallenges, fetchUserChallenges]);

  // پیوستن به چالش
  const joinChallenge = useCallback(async (challengeId) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await challengeService.joinChallenge(challengeId);
      await fetchActiveChallenges();
      await fetchUserChallenges();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchActiveChallenges, fetchUserChallenges]);

  // بارگذاری اولیه
  useEffect(() => {
    if (user) {
      fetchActiveChallenges();
      fetchUserChallenges();
      fetchUnlockedLevels();
    }
  }, [user, fetchActiveChallenges, fetchUserChallenges, fetchUnlockedLevels]);

  return {
    challenges: activeChallenges,
    userChallenges,
    unlockedLevels,
    isLoading,
    error,
    createChallenge,
    joinChallenge,
    refresh: fetchActiveChallenges,
  };
};