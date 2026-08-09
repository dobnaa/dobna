// frontend-mobile/lib/screens/wallet/wallet_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../providers/wallet_provider.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/wallet/total_value_card.dart';
import '../../widgets/wallet/action_buttons.dart';
import '../../widgets/wallet/asset_item.dart';
import '../../widgets/wallet/filter_chips.dart';
import '../../widgets/common/loading_indicator.dart';
import '../../widgets/common/error_widget.dart';
import '../../utils/currency_formatter.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({super.key});

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  Future<void> _loadData() async {
    final authProvider = context.read<AuthProvider>();
    final walletProvider = context.read<WalletProvider>();
    if (authProvider.user != null) {
      await walletProvider.fetchWalletData(authProvider.user!.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final walletProvider = context.watch<WalletProvider>();
    final authProvider = context.watch<AuthProvider>();

    if (walletProvider.isLoading) {
      return const LoadingIndicator();
    }

    if (walletProvider.error != null) {
      return CustomErrorWidget(
        message: walletProvider.error!,
        onRetry: _loadData,
      );
    }

    final assets = walletProvider.assets;
    final totalValue = walletProvider.totalValue;
    final dailyInterest = walletProvider.dailyInterest;
    final did = authProvider.user?.did ?? '---';

    return Scaffold(
      backgroundColor: const Color(0xFF0B0B0E),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'DOBNA Wallet',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner, color: Colors.white),
            onPressed: () => context.go('/scan-qr'),
          ),
          IconButton(
            icon: const Icon(Icons.share, color: Colors.white),
            onPressed: () {
              // اشتراک‌گذاری لینک دعوت
            },
          ),
        ],
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => context.pop(),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        color: const Color(0xFFA855F7),
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // شناسه DID
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF1C1C1E),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.fingerprint, size: 14, color: Colors.grey),
                    const SizedBox(width: 6),
                    Text(
                      'DID: $did',
                      style: const TextStyle(color: Colors.grey, fontSize: 10),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),

              // کارت ارزش کل
              TotalValueCard(
                totalValue: totalValue,
                dailyInterest: dailyInterest,
                onWithdrawInterest: () {
                  // برداشت سود
                },
              ),
              const SizedBox(height: 16),

              // دکمه‌های عملیاتی
              ActionButtons(
                onDeposit: () => context.go('/deposit'),
                onWithdraw: () => context.go('/withdraw'),
                onSwap: () => context.go('/swap'),
                onTransfer: () => context.go('/transfer'),
              ),
              const SizedBox(height: 16),

              // فیلترهای Crypto/Currency
              FilterChips(
                showCrypto: walletProvider.showCrypto,
                showCurrency: walletProvider.showCurrency,
                onToggleCrypto: (value) => walletProvider.toggleCrypto(value),
                onToggleCurrency: (value) => walletProvider.toggleCurrency(value),
              ),
              const SizedBox(height: 16),

              // عنوان Assets
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Assets',
                    style: TextStyle(color: Colors.grey, fontSize: 14),
                  ),
                  Text(
                    '${assets.length} items',
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // لیست دارایی‌ها
              if (assets.isEmpty)
                Container(
                  padding: const EdgeInsets.all(32),
                  alignment: Alignment.center,
                  child: Column(
                    children: [
                      const Icon(Icons.wallet, size: 48, color: Colors.grey),
                      const SizedBox(height: 8),
                      Text(
                        'No assets found',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                )
              else
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: assets.length,
                  itemBuilder: (context, index) {
                    final asset = assets[index];
                    return AssetItem(
                      asset: asset,
                      onTap: () => context.go('/coin/${asset.currency}'),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}