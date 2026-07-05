const CommunityPage = () => {
  const { communityId } = useParams();
  const [levels, setLevels] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // دریافت اطلاعات گروه از Supabase
    const fetchCommunity = async () => {
      const { data } = await supabase
        .from('communities')
        .select('*')
        .eq('id', communityId)
        .single();
      // دریافت سطوح فعال (از جدول rooms یا levels)
      const { data: levelsData } = await supabase
        .from('rooms')
        .select('level, card_price, room_number')
        .eq('community_id', communityId);
      setLevels(levelsData);
      setBalance(data.balance);
    };
    fetchCommunity();
  }, [communityId]);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      {/* هدر گروه */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">IRT</h1>
        <div className="text-right">
          <div className="text-white">موجودی: {balance} تومان</div>
          <div className="text-gray-400 text-sm">$: 10.956</div>
        </div>
      </div>

      {/* لیست سطوح */}
      <div className="space-y-3">
        {levels.map((level, index) => (
          <LevelCard
            key={index}
            level={level.level}
            cardPrice={level.card_price}
            roomNumber={level.room_number}
            currency="IRT"
            onPress={() => navigate(`/game/${level.room_number}`)}
          />
        ))}
      </div>

      {/* منوی پایین (کامپوننت جداگانه) */}
      <BottomNav />
    </div>
  );
};